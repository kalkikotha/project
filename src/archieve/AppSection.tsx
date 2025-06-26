
const AppSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary-100 to-primary-200 rounded-4xl py-16 px-8 lg:px-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary rounded-full"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300&h=600&dpr=1" 
                  alt="Wethenticate Mobile App"
                  className="w-64 h-auto mx-auto lg:mx-0 rounded-3xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="lg:col-span-8">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-dark mb-6">
                Shop faster with Wethenticate App
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis sed ptibus liberolectus nonet psryroin. Amet sed lorem posuere sit iaculis amet, ac urna. Adipiscing fames semper erat ac in suspendisse iaculis. Amet blandit tortor praesent ante vitae. A, enim pretiummi senectus magna. Sagittis sed ptibus liberolectus non et psryroin.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#" className="inline-block">
                  <img 
                    src="https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=150&h=50&dpr=1" 
                    alt="Download on App Store"
                    className="h-14 w-auto rounded-lg hover:scale-105 transition-transform duration-200"
                  />
                </a>
                <a href="#" className="inline-block">
                  <img 
                    src="https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=150&h=50&dpr=1" 
                    alt="Get it on Google Play"
                    className="h-14 w-auto rounded-lg hover:scale-105 transition-transform duration-200"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;