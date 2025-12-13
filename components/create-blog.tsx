'use client'
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, ImagePlus, MapPin, FileText, Tag } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createBlog } from '@/store/blog.store';

interface FormData {
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

export default function BlogSubmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    location: '',
    excerpt: '',
    latitude: '',
    longitude: ''
  });

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<SubmitMessage | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFeaturedImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, featured_image: 'Please select a valid image file' }));
        return;
      }
      if (file.size > 2048 * 1024) {
        setErrors(prev => ({ ...prev, featured_image: 'Image must be less than 2MB' }));
        return;
      }
      setFeaturedImage(file);
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

  const handleRemoveFeaturedImage = () => {
    setFeaturedImage(null);
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

    // Full validation for all submissions
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

    if (!featuredImage) {
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
      // Prepare FormData for submission
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

      submitData.append('featured_image', featuredImage!);

      additionalImages.forEach((image, index) => {
        submitData.append(`images[${index}]`, image);
      });

      tags.forEach((tag, index) => {
        submitData.append(`tags[${index}]`, tag.trim());
      });

       await createBlog(submitData);

      // if (!response.ok) {
      //   // Handle validation errors
      //   if (result.errors) {
      //     const newErrors: FormErrors = {};
      //     Object.keys(result.errors).forEach((key) => {
      //       newErrors[key as keyof FormErrors] = result.errors[key][0];
      //     });
      //     setErrors(newErrors);
      //     setSubmitMessage({
      //       type: 'error',
      //       text: result.message || 'Please fix the validation errors'
      //     });
      //     return;
      //   }

      //   throw new Error(result.message || 'Failed to submit blog post');
      // }

      // setSubmitMessage({
      //   type: 'success',
      //   text: result.message || 'Blog post submitted for approval! You will be notified once it is reviewed.'
      // });

      // Reset form on success
      setFormData({
        title: '',
        content: '',
        location: '',
        excerpt: '',
        latitude: '',
        longitude: ''
      });
      setFeaturedImage(null);
      setAdditionalImages([]);
      setTags([]);
      setErrors({});

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error instanceof Error
        ? error.message
        : 'Failed to submit blog post. Please try again.';

      setSubmitMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard this blog post?')) {
      setFormData({
        title: '',
        content: '',
        location: '',
        excerpt: '',
        latitude: '',
        longitude: ''
      });
      setFeaturedImage(null);
      setAdditionalImages([]);
      setTags([]);
      setErrors({});
      setSubmitMessage(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center overflow-y-auto bg-background px-6 py-12">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">Create Blog Post</CardTitle>
          <CardDescription>
            Share your travel experiences and stories with the community
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
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
                rows={12}
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
              Featured Image
            </h3>

            <div className="space-y-2">
              <Label htmlFor="featured_image">Upload Featured Image *</Label>
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

            {featuredImage && (
              <div className="relative group w-full max-w-md">
                <img
                  src={URL.createObjectURL(featuredImage)}
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
                Upload multiple images to showcase your experience. JPEG, JPG, PNG or WebP. Max 2MB each.
              </p>
            </div>

            {additionalImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {additionalImages.map((image, index) => (
                  <div key={index} className="relative group">
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
                placeholder="Add tag (e.g., adventure, beach, culture)"
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
        </CardContent>

        <CardFooter className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="flex-1"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit for Review'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}