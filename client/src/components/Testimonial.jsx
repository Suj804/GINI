import { assets } from "../assets/assets";

const testimonials = [
  {
    image: "https://images..com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "John Doe",
    designation: "Marketing Director, TechCorp",
    feedback:
      "ContentAI has significantly streamlined our content operations. The quality, consistency, and speed of delivery have exceeded our expectations.",
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Jane Smith",
    designation: "Senior Content Strategist, TechCorp",
    feedback:
      "The AI-powered tools have transformed how we plan and execute content. Our productivity has increased while maintaining exceptional quality.",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    name: "David Lee",
    designation: "Lead Content Writer, TechCorp",
    feedback:
      "ContentAI enables us to create engaging, on-brand content faster than ever. It has become an essential part of our workflow.",
    rating: 4,
  },
];

const Testimonial = () => {
  return (
    <section className="px-4 sm:px-20 xl:px-32 py-24 bg-white">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-slate-800 text-[42px] font-semibold">
          Trusted by Creative Professionals
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto mt-2">
          Hear directly from professionals who rely on ContentAI to deliver
          impactful and high-quality content at scale.
        </p>
      </div>

      {/* Testimonials */}
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="p-8 m-4 max-w-xs rounded-xl bg-[#FDFDFE] shadow-md border border-gray-100 hover:-translate-y-1 transition duration-300"
          >
            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img
                    key={index}
                    src={
                      index < testimonial.rating
                        ? assets.star_icon
                        : assets.star_dull_icon
                    }
                    alt="rating star"
                    className="w-4 h-4"
                  />
                ))}
            </div>

            {/* Feedback */}
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              “{testimonial.feedback}”
            </p>

            <hr className="border-gray-200 mb-5" />

            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-sm">
                <h3 className="font-medium text-gray-700">
                  {testimonial.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {testimonial.designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;