import { Office } from "@/types";

const Offices = ({offices}:{offices:Office[]})=>{

  return(
    <div className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Our Global Offices
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Visit us at any of our worldwide locations or reach out to your nearest office.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {offices.map((office) => (
                    <div key={office.id} className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={office.image}
                          alt={`${office.city} office`}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-card-foreground mb-2">
                          {office.city}
                        </h3>
                        <p className="text-orange-400 font-medium mb-4">
                          {office.country}
                        </p>

                        <div className="space-y-3 text-sm text-muted-foreground">
                          <div className="flex items-start space-x-2">
                            <span>📍</span>
                            <span>{office.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>📞</span>
                            <a href={`tel:${office.phone}`} className="hover:text-orange-600 transition-colors">
                              {office.phone}
                            </a>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>📧</span>
                            <a href={`mailto:${office.email}`} className="hover:text-orange-600 transition-colors">
                              {office.email}
                            </a>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>🕐</span>
                            <span>{office.timezone}</span>
                          </div>
                        </div>

                        <div className="mt-6">
                          <button className="w-full py-2 px-4 rounded-lg  transition-colors font-medium bg-primary text-primary-foreground">
                            Get Directions
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  )

}
export default Offices;