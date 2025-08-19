const PROJECTS = [
  {
    title: "Flat Hat Games",
    term: "Fall '24",
    link: "https://games.flathatnews.com/",
    image: "/flathat.jpg",
  },
  {
    title: "Recruitment",
    term: "Fall '24",
    link: "/",
    image: "/recruitment.jpg",
  },
  {
    title: "SAD",
    term: "Spring '24",
    link: "https://github.com/gdscwm/sld",
    image: "/sld.jpg",
  },
  {
    title: "Global Americas",
    term: "Spring '24",
    link: "https://github.com/gdscwm/Global-Americas",
    image: "/global.jpg",
  },
  {
    title: "Campus Escort",
    term: "Spring '21",
    link: "https://apps.apple.com/us/app/w-m-campus-escort/id1582947297",
    image: "/escort.jpeg",
  },
];

export default function ProjectsSection() {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        Take a look at our projects.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
        {PROJECTS.map((proj, i) => (
          <a
            key={i}
            href={proj.link}
            className="relative group bg-gray-800 text-white rounded-lg p-4 flex flex-col min-h-[10rem] overflow-hidden transition-transform duration-200 hover:scale-105"
          >
            <img
              src={proj.image}
              alt={proj.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-300"
            />
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="font-semibold group-hover:brightness-125">
                {proj.title}
              </h3>
              <span className="mt-auto group-hover:brightness-125">
                {proj.term}
              </span>
            </div>
          </a>
        ))}
      </div>
      <a
        href="https://docs.google.com/document/d/1bvN3zt_BzmtPjl_jkHCu0kWL2yXIZYlfaW7vsbhEos4/edit"
        className="text-lg text-blue-400 hover:text-blue-500 underline font-semibold"
      >
        Click here for past projects
      </a>
    </section>
  );
}
