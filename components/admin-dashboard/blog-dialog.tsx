'use client'
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, ImagePlus, MapPin, FileText, Tag, Edit, PlusCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createBlog, updateBlog } from '@/store/blog.store';



export interface FormData {
  title: string;
  content: string;
  location: string;
  excerpt: string;
  latitude: string;
  longitude: string;
}

interface FormErrors {
  title?: string;
  content?: string;
  location?: string;
  excerpt?: string;
  latitude?: string;
  longitude?: string;
  featured_image?: string;
}

interface SubmitMessage {
  type: 'success' | 'error';
  text: string;
}

interface BlogDialogProps {
  mode: 'create' | 'edit';
  blog?: Blog;
  //onSubmit?: (data: FormData) => Promise<void>;
  triggerButton?: React.ReactNode;
}
import {toast} from "sonner"
import { Blog } from '@/types';

export default function BlogDialog({ mode, blog, triggerButton }: BlogDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    location: '',
    excerpt: '',
    latitude: '',
    longitude: ''
  });

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<SubmitMessage | null>(null);

  // Initialize form with blog data when editing
  useEffect(() => {
    if (mode === 'edit' && blog && open) {
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        location: blog.location || '',
        excerpt: blog.excerpt || '',
        latitude: blog.latitude  || '',
        longitude: blog.longitude || ''
      });
      setTags(blog.tags || []);
      setExistingImages(blog.images || []);
      setFeaturedImagePreview(blog.featured_image || null);
    }
  }, [mode, blog, open]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      location: '',
      excerpt: '',
      latitude: '',
      longitude: ''
    });
    setFeaturedImage(null);
    setFeaturedImagePreview(null);
    setAdditionalImages([]);
    setExistingImages([]);
    setTags([]);
    setCurrentTag('');
    setErrors({});
    setSubmitMessage(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFeaturedImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, featured_image: 'Please select a valid image file' }));
        return;
      }
      if (file.size > 2048 * 1024) {
        setErrors(prev => ({ ...prev, featured_image: 'Image must be less than 2MB' }));
        return;
      }
      setFeaturedImage(file);
      setFeaturedImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, featured_image: undefined }));
    }
  };

  const handleAdditionalImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files);
    const validFiles = filesArray.filter(file => {
      if (!file.type.startsWith('image/')) return false;
      if (file.size > 2048 * 1024) return false;
      return true;
    });
    setAdditionalImages(prev => [...prev, ...validFiles]);
  };

  const handleRemoveAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveFeaturedImage = () => {
    setFeaturedImage(null);
    setFeaturedImagePreview(null);
  };

  const handleAddTag = () => {
    const trimmedTag = currentTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && trimmedTag.length <= 50) {
      setTags(prev => [...prev, trimmedTag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 100) {
      newErrors.content = 'Content must be at least 100 characters';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.length > 255) {
      newErrors.location = 'Location must be less than 255 characters';
    }

    if (formData.excerpt && formData.excerpt.length > 500) {
      newErrors.excerpt = 'Excerpt must be less than 500 characters';
    }

    if (mode === 'create' && !featuredImage) {
      newErrors.featured_image = 'Featured image is required';
    }

    if (formData.latitude && (isNaN(Number(formData.latitude)) || Number(formData.latitude) < -90 || Number(formData.latitude) > 90)) {
      newErrors.latitude = 'Latitude must be between -90 and 90';
    }

    if (formData.longitude && (isNaN(Number(formData.longitude)) || Number(formData.longitude) < -180 || Number(formData.longitude) > 180)) {
      newErrors.longitude = 'Longitude must be between -180 and 180';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setSubmitMessage({ type: 'error', text: 'Please fix the errors above' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title.trim());
      submitData.append('content', formData.content.trim());
      submitData.append('location', formData.location.trim());

      if (formData.excerpt.trim()) {
        submitData.append('excerpt', formData.excerpt.trim());
      }

      if (formData.latitude.trim()) {
        submitData.append('latitude', formData.latitude.trim());
      }

      if (formData.longitude.trim()) {
        submitData.append('longitude', formData.longitude.trim());
      }

      if (featuredImage) {
        submitData.append('featured_image', featuredImage);
      }

      additionalImages.forEach((image, index) => {
        submitData.append(`images[${index}]`, image);
      });

      tags.forEach((tag, index) => {
        submitData.append(`tags[${index}]`, tag.trim());
      });

      if(mode === "create"){
        await createBlog(submitData)
        toast.success("Blog Created Successfully")
        setOpen(false);
        return;
      }
      if(mode === "edit"){
        await updateBlog(blog!.id,submitData)
        toast.success("Blog updated Succesfully")
        setOpen(false);
        return;
      }


    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error instanceof Error
        ? error.message
        : `Failed to ${mode === 'create' ? 'create' : 'update'} blog post. Please try again.`;

      setSubmitMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTrigger = mode === 'create' ? (
    <Button>
      <PlusCircle className="w-4 h-4 mr-2" />
      Create Blog
    </Button>
  ) : (
    <Button variant="outline" size="sm">
      <Edit className="w-4 h-4 mr-2" />
      Edit
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl">
            {mode === 'create' ? 'Create Blog Post' : 'Edit Blog Post'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Share your travel experiences and stories with the community'
              : 'Update your blog post details'
            }
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-180px)] px-6">
          <div className="space-y-6 pb-6">
            {submitMessage && (
              <Alert variant={submitMessage.type === 'error' ? 'destructive' : 'default'}>
                <AlertDescription>{submitMessage.text}</AlertDescription>
              </Alert>
            )}

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Basic Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., My Amazing Trip to Bali"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt (Optional)</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="A brief summary of your blog post (max 500 characters)"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={2}
                  maxLength={500}
                  className={errors.excerpt ? 'border-red-500' : ''}
                />
                <div className="flex justify-between">
                  {errors.excerpt && (
                    <p className="text-sm text-red-500">{errors.excerpt}</p>
                  )}
                  <p className="text-sm text-gray-500 ml-auto">
                    {formData.excerpt.length}/500 characters
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Share your travel story, tips, and experiences... (minimum 100 characters)"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={8}
                  className={errors.content ? 'border-red-500' : ''}
                />
                <div className="flex justify-between">
                  {errors.content && (
                    <p className="text-sm text-red-500">{errors.content}</p>
                  )}
                  <p className="text-sm text-gray-500 ml-auto">
                    {formData.content.length} characters {formData.content.length < 100 && `(minimum 100)`}
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location
              </h3>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., Ubud, Bali, Indonesia"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={errors.location ? 'border-red-500' : ''}
                />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude (Optional)</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="any"
                    placeholder="e.g., -8.5069"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    className={errors.latitude ? 'border-red-500' : ''}
                  />
                  {errors.latitude && (
                    <p className="text-sm text-red-500">{errors.latitude}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude (Optional)</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="any"
                    placeholder="e.g., 115.2625"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    className={errors.longitude ? 'border-red-500' : ''}
                  />
                  {errors.longitude && (
                    <p className="text-sm text-red-500">{errors.longitude}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ImagePlus className="w-5 h-5" />
                Featured Image {mode === 'create' && '*'}
              </h3>

              <div className="space-y-2">
                <Label htmlFor="featured_image">
                  {mode === 'create' ? 'Upload Featured Image *' : 'Change Featured Image'}
                </Label>
                <Input
                  id="featured_image"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFeaturedImageChange}
                  className={errors.featured_image ? 'border-red-500' : ''}
                />
                <p className="text-sm text-gray-500">
                  JPEG, JPG, PNG or WebP. Max size 2MB.
                </p>
                {errors.featured_image && (
                  <p className="text-sm text-red-500">{errors.featured_image}</p>
                )}
              </div>

              {featuredImagePreview && (
                <div className="relative group w-full max-w-md">
                  <img
                    src={featuredImagePreview}
                    alt="Featured preview"
                    className="w-full h-48 object-cover rounded border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleRemoveFeaturedImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Additional Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Images (Optional)</h3>

              <div className="space-y-2">
                <Label htmlFor="images">Upload Additional Images</Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  onChange={handleAdditionalImagesChange}
                />
                <p className="text-sm text-gray-500">
                  Upload multiple images. JPEG, JPG, PNG or WebP. Max 2MB each.
                </p>
              </div>

              {(existingImages.length > 0 || additionalImages.length > 0) && (
                <div className="grid grid-cols-3 gap-3">
                  {existingImages.map((image, index) => (
                    <div key={`existing-${index}`} className="relative group">
                      <img
                        src={image}
                        alt={`Existing ${index + 1}`}
                        className="w-full h-24 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveExistingImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {additionalImages.map((image, index) => (
                    <div key={`new-${index}`} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveAdditionalImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags (Optional)
              </h3>

              <div className="flex gap-2">
                <Input
                  placeholder="Add tag (e.g., adventure, beach)"
                  value={currentTag}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  maxLength={50}
                />
                <Button type="button" onClick={handleAddTag} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 pb-6 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? (mode === 'create' ? 'Creating...' : 'Updating...')
              : (mode === 'create' ? 'Create Blog' : 'Update Blog')
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}