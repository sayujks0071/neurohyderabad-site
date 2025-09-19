import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ramesh Patel',
    age: 52,
    condition: 'Brain Tumor Surgery',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'Dr. Rajesh Kumar saved my life with his exceptional surgical skills. The entire team at NeuroHyderabad provided outstanding care throughout my brain tumor surgery and recovery. I am forever grateful.',
    date: 'March 2024'
  },
  {
    name: 'Lakshmi Reddy',
    age: 38,
    condition: 'Spine Surgery',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b3e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'After years of chronic back pain, Dr. Priya Sharma performed minimally invasive spine surgery. I am now pain-free and back to my normal activities. The post-operative care was excellent.',
    date: 'February 2024'
  },
  {
    name: 'Suresh Kumar',
    age: 45,
    condition: 'Emergency Surgery',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'When I had a severe head injury from an accident, Dr. Arun Reddy and his team acted quickly. Their emergency care and surgical expertise saved my life. The facilities are world-class.',
    date: 'January 2024'
  },
  {
    name: 'Meera Sharma',
    age: 29,
    condition: 'Epilepsy Treatment',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'The comprehensive epilepsy treatment program at NeuroHyderabad changed my life. The doctors are knowledgeable, compassionate, and use the latest technology for diagnosis and treatment.',
    date: 'December 2023'
  },
  {
    name: 'Venkat Rao',
    age: 60,
    condition: 'Aneurysm Repair',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'The precision and care with which my brain aneurysm was treated was remarkable. The surgical team explained everything clearly and made me feel confident throughout the process.',
    date: 'November 2023'
  },
  {
    name: 'Priyanka Nair',
    age: 34,
    condition: 'Pediatric Surgery',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'My 8-year-old son needed complex brain surgery. The pediatric neurosurgery team was amazing with children. They made a scary situation manageable for our entire family.',
    date: 'October 2023'
  }
];

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-primary-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Patient Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Read what our patients have to say about their experience with our neurosurgical team 
            and the life-changing care they received.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="h-8 w-8 text-primary-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial text */}
              <blockquote className="text-gray-700 leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Patient info */}
              <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">Age {testimonial.age}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary-600">{testimonial.condition}</p>
                      <p className="text-xs text-gray-500">{testimonial.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">5000+</div>
              <div className="text-gray-600">Successful Surgeries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">98.5%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Patient Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">25+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}