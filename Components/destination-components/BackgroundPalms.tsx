const BackgroundPalms = () => {
  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className="absolute top-0 left-0 w-96 h-96 transform rotate-12 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cpath d=%22M50 80 Q30 60 20 40 Q40 30 50 50 Q60 30 80 40 Q70 60 50 80%22 fill=%22%23ffffff%22 opacity=%220.1%22/%3E%3C/svg%3E')]"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 transform -rotate-12 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cpath d=%22M50 80 Q30 60 20 40 Q40 30 50 50 Q60 30 80 40 Q70 60 50 80%22 fill=%22%23ffffff%22 opacity=%220.1%22/%3E%3C/svg%3E')]"></div>
    </div>
  );
};

export default BackgroundPalms;
