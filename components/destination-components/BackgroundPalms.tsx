const BackgroundPalms = () => {
  return (
    <div className=" inset-0 transition-all duration-1000 ease-in-out">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
                    }}
                />
                <div className={`absolute inset-0 bg-gray-900 opacity-60 transition-all duration-1000`} />
                <div className="absolute inset-0 bg-black opacity-20" />
      </div>
  );
};

export default BackgroundPalms;
