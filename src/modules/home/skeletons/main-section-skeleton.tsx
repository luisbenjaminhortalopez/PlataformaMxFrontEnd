export const MainSectionSkeleton = () => {
  return (
    <>
      <div className="lg:hidden w-full mb-8 h-[320px]">
        <article className="bg-neutral-300 rounded-3xl overflow-hidden relative min-h-[320px] lg:h-full w-full cursor-pointer" />
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_1fr] gap-8 lg:gap-14 items-start max-w-7xl mx-auto">
        <div className="space-y-8">
          <article className="bg-neutral-300 rounded-3xl overflow-hidden relative w-full sm:w-[340px] lg:w-full mx-auto h-[320px]" />
          <article className="bg-neutral-300 rounded-3xl overflow-hidden relative w-full sm:w-[340px] lg:w-full mx-auto h-[320px]" />
        </div>

        <div className="hidden lg:block h-full">
          <div className="h-full flex">
            <article className="bg-neutral-300 rounded-3xl overflow-hidden relative min-h-[320px] lg:h-full w-full cursor-pointer" />
          </div>
        </div>

        <div className="space-y-8">
          <article className="bg-neutral-300 rounded-3xl overflow-hidden relative w-full sm:w-[340px] lg:w-full mx-auto h-[320px]" />
          <article className="bg-neutral-300 rounded-3xl overflow-hidden relative w-full sm:w-[340px] lg:w-full mx-auto h-[320px]" />
        </div>
      </section>
    </>
  );
};
