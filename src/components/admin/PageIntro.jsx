function PageIntro({ eyebrow, title, description, action }) {
  return <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div>{eyebrow ? <span className="text-sm font-semibold uppercase tracking-[0.25em] text-terracotta">{eyebrow}</span> : null}<h2 className="mt-2 font-serif text-4xl text-stone">{title}</h2>{description ? <p className="mt-2 max-w-2xl text-stone-light">{description}</p> : null}</div>{action ? <div>{action}</div> : null}</div>;
}

export default PageIntro;
