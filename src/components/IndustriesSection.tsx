import Image from "next/image";

const industries = [
  {
    title: "Generators & Solar",
    description: "Industrial generators, inverters, solar panels, and electrical components.",
    image: "/industries/generators-solar.jpg",
  },
  {
    title: "Electronics",
    description: "Mobile devices, accessories, cables, components, and consumer electronics.",
    image: "/industries/electronics.jpg",
  },
  {
    title: "Building Materials",
    description: "Tiles, sanitaryware, roofing sheets, aluminum profiles, and fittings",
    image: "/industries/building-materials.jpg",
  },
  {
    title: "SME Machinery",
    description: "Packaging machines, printing equipment, food processing machinery.",
    image: "/industries/sme-machinery.jpg",
  },
  {
    title: "FMCG & Cosmetics",
    description: "Cosmetics, hair products, household items, and fast-moving consumer goods.",
    image: "/industries/fmcg-cosmetics.jpg",
  },
  {
    title: "Textiles & Fabrics",
    description: "Ankara prints, lace, garment materials, and other fabrics.",
    image: "/industries/textiles-fabrics.jpg",
  },
];

function IndustryCard({
  title,
  description,
  image,
  delay,
}: (typeof industries)[0] & { delay: number }) {
  return (
    <div
      data-animate-up
      data-delay={delay}
      className="group relative rounded-[10px] overflow-hidden w-full aspect-square cursor-pointer"
    >
      {/* Base blue background */}
      <div className="absolute inset-0 bg-[#0063e8]" />

      {/* Product image */}
      <Image src={image} alt={title} fill className="object-cover" />

      {/* Default overlay: blue top ~53% */}
      <div className="absolute top-0 left-0 w-full h-[190px] bg-[rgba(26,124,255,0.9)] group-hover:opacity-0 transition-opacity duration-300" />

      {/* Hover overlay: EDF7FF top ~53% */}
      <div className="absolute top-0 left-0 w-full h-[190px] bg-[rgba(237,247,255,0.9)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-[27px] flex flex-col gap-[14px] z-10">
        <h3 className="font-['Satoshi'] font-medium text-[27px] leading-[1.15] text-white group-hover:text-[#000029] transition-colors duration-300">
          {title}
        </h3>
        <p className="font-['Satoshi'] font-normal text-[14px] leading-[15px] tracking-[0.122px] text-white group-hover:text-[#303030] transition-colors duration-300">
          {description}
        </p>
        <span className="font-['Satoshi'] font-bold text-[14px] leading-[15px] tracking-[0.122px] text-white group-hover:text-[#1a7cff] transition-colors duration-300">
          Find Suppliers &gt;
        </span>
      </div>
    </div>
  );
}

export default function IndustriesSection() {
  return (
    <section id="industries" className="dot-bg bg-white dark:bg-[#0a0f1e] py-16 px-6">
      <div className="max-w-[1128px] mx-auto flex flex-col gap-12 items-center">
        {/* Heading */}
        <h2 data-animate-up data-delay="0" className="font-['Satoshi'] font-medium text-[42px] leading-[52px] tracking-[-0.96px] text-center">
          <span className="text-[#000029] dark:text-white">Import confidently through verified </span>
          <br />
          <span className="text-[#0063e8]">supplier across industries</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {industries.map((industry, i) => (
            <IndustryCard key={industry.title} {...industry} delay={(i % 3) * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
