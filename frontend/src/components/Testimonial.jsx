import { assets } from "../assets/assets";

// Sample feedback for demo purposes
const testimonials = [
  {
    name: "John Doe",
    designation: "Marketing Director, TechCorp",
    feedback:
      "GINI has significantly streamlined our content operations. The quality, consistency, and speed of delivery have exceeded our expectations.",
    rating: 4,
  },
  {
    name: "Jane Smith",
    designation: "Senior Content Strategist, TechCorp",
    feedback:
      "The AI-powered tools have transformed how we plan and execute content. Our productivity has increased while maintaining exceptional quality.",
    rating: 5,
  },
  {
    name: "David Lee",
    designation: "Lead Content Writer, TechCorp",
    feedback:
      "GINI enables us to create engaging, on-brand content faster than ever. It has become an essential part of our workflow.",
    rating: 4,
  },
];

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

const Testimonial = () => {
  return (
    <section id="reviews" className="px-4 sm:px-20 xl:px-32 py-24">
      <div className="text-center mb-14">
        <h2 className="text-ink text-[42px] font-semibold">
          Trusted by Creative Professionals
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto mt-2">
          Hear from professionals who use GINI to deliver impactful, high-quality content
          at scale.
        </p>
      </div>

      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="glass p-8 m-4 w-80 rounded-2xl hover:-translate-y-1 transition duration-300"
          >
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <img
                  key={index}
                  src={index < testimonial.rating ? assets.star_icon : assets.star_dull_icon}
                  alt="rating star"
                  className="w-4 h-4"
                />
              ))}
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              “{testimonial.feedback}”
            </p>
            <hr className="border-gray-200 mb-5" />

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                {initials(testimonial.name)}
              </div>
              <div className="text-sm">
                <h3 className="font-medium text-gray-700">{testimonial.name}</h3>
                <p className="text-xs text-gray-500">{testimonial.designation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
