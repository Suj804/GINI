
import { assets } from "../assets/assets";

const testimonials = [
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "John Doe",
    designation: "Marketing Director, TechCorp",
    feedback:
      "ContentAI has significantly streamlined our content operations. The quality, consistency, and speed of delivery have exceeded our expectations.",
    rating: 4,
  },
  {
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Jane Smith",
    designation: "Senior Content Strategist, TechCorp",
    feedback:
      "The AI-powered tools have transformed how we plan and execute content. Our productivity has increased while maintaining exceptional quality.",
    rating: 5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    name: "David Lee",
    designation: "Lead Content Writer, TechCorp",
    feedback:
      "ContentAI enables us to create engaging, on-brand content faster than ever. It has become an essential part of our workflow.",
    rating: 4,
  },
];

const Testimonial = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fbf7ff] to-[#fff4f9] px-4 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-20 xl:px-32">

      {/* Soft background glows */}
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 mb-10 text-center sm:mb-14">
        <span className="inline-flex rounded-full border border-purple-200/70 bg-white/70 px-4 py-1.5 text-xs font-medium tracking-wide text-purple-700 shadow-sm backdrop-blur-md sm:text-sm">
          CUSTOMER STORIES
        </span>

        <h2 className="mx-auto mt-4 text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl md:text-[42px]">
          Trusted by{" "}
          <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Creative Professionals
          </span>
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">
          Hear directly from professionals who rely on GINI-AI to deliver
          impactful and high-quality content at scale.
        </p>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="group flex w-full max-w-sm flex-col rounded-2xl border border-white/80 bg-white/70 p-6 shadow-[0_8px_30px_rgba(139,92,246,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-200 hover:bg-white/90 hover:shadow-[0_16px_40px_rgba(168,85,247,0.14)] sm:p-7"
          >
            {/* Rating */}
            <div
              className="mb-4 flex items-center gap-1"
              aria-label={`${testimonial.rating} out of 5 stars`}
            >
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
                    alt=""
                    className="h-4 w-4"
                  />
                ))}
            </div>

            {/* Feedback */}
            <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">
              “{testimonial.feedback}”
            </p>

            <hr className="mb-5 border-purple-100" />

            {/* User Info */}
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                loading="lazy"
                className="h-12 w-12 shrink-0 rounded-full border-2 border-purple-100 object-cover"
              />

              <div className="min-w-0 text-sm">
                <h3 className="font-semibold text-slate-800 transition-colors duration-300 group-hover:text-purple-700">
                  {testimonial.name}
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-gray-500">
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
