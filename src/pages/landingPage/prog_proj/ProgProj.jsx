import Cards from "../cards/Cards";


export default function About() {
  return (
    <div className="h-full flex flex-col items-center font-montserrat  bg-[#EBF4FD] pt-10">
      <div className="w-[80%] px-5">
      <h2 className="text-[#298BD9] text-[2rem] font-extrabold">Programs & Projects</h2>
      <p className="font-medium font-manrope text-base leading-7 text-justify">Consectetur adipiscing elit. Phasellus vehicula risus id libero porta,
          vitae laoreet magna fringilla. Aliquam non maximus elit, quis aliquet
          mauris. Donec turpis velit, gravida efficitur turpis eu, iaculis 
          tempus mi. Suspendisse quis bibendum neque, ut tincidunt lacus.
          Vivamus cursus mattis mauris, sed aliquet tellus laoreet ac. Phasellus
          quis mauris felis. Donec ultrices libero tincidunt mauris sodales, 
          nec volutpat leo sagittis. Nulla vitae diam arcu. Curabitur molestie
          nisl quam, vitae facilisis est bibendum non. Donec imperdiet felis id magna placerat faucibus. Sed et molestie sem. Nunc convallis tincidunt odio pellentesque suscipit. Vivamus dapibus quis sem sit amet euismod. Aenean mollis sit amet metus sed volutpat. Aenean porttitor sagittis ipsum, ultricies mattis metus ornare et. Nulla quis est dictum, bibendum tortor sit amet, posuere libero. Proin sodales mattis arcu sed malesuada. 
          <br />
          <br />
          
         Aenean scelerisque eu velit non pellentesque. Lorem ipsum dolor sit amet,
         consectetur adipiscing elit. Aliquam fringilla aliquet justo, eu elementum urna malesuada eu.</p>
     <div className="flex items-center  gap-5 py-10">
          <div className="rounded-[20px] bg-white w-[50%] h-[400px]"></div>
          <div  className="rounded-[20px] bg-white w-[50%] h-[400px]"></div>
     </div>
     <p className="font-medium font-manrope  text-base leading-7 text-justify">
     Consectetur adipiscing elit. Phasellus vehicula risus id libero porta, vitae 
     laoreet magna fringilla. Aliquam non maximus elit, quis aliquet mauris.
      Donec turpis velit, gravida efficitur turpis eu, iaculis tempus mi. 
      Suspendisse quis bibendum neque, ut tincidunt lacus. Vivamus cursus mattis
       mauris, sed aliquet tellus laoreet ac. Phasellus quis mauris felis. Donec ultrices libero tincidunt mauris sodales, nec volutpat leo sagittis.
      <br />
      <br />
        Nulla vitae diam arcu. Curabitur molestie nisl quam, vitae facilisis est bibendum non. Donec imperdiet felis id magna placerat faucibus. Sed et molestie sem. Nunc convallis tincidunt odio pellentesque suscipit. Vivamus dapibus quis sem sit amet euismod. Aenean mollis sit amet metus sed volutpat. Aenean porttitor sagittis ipsum, ultricies mattis metus ornare et. Nulla quis est dictum, bibendum tortor sit amet, posuere libero.
        Proin sodales mattis arcu sed malesuada. Aenean scelerisque eu velit non pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fringilla aliquet justo, eu elementum urna malesuada eu.
     </p>

     <div className="py-20">
     <h2 className="text-[#298BD9] pb-10 text-[2rem] font-extrabold ">Curabitur varius sapien</h2>
      <p  className="font-medium font-manrope  text-base leading-7 text-justify">
      Etiam iaculis est ut justo egestas, eu eleifend ex eleifend. Sed non mauris lorem. Cras ornare sed lorem eget lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur suscipit, sapien in pulvinar iaculis, lectus dolor tincidunt mauris, eget efficitur ante ligula a mauris. Morbi mollis congue eros a eleifend. Nulla ullamcorper at nulla vitae cursus. Donec quis egestas velit.
      <br />
      <br />
      Vestibulum et leo aliquam, tincidunt erat ut, mollis lacus. Maecenas tincidunt tempus orci sit amet dignissim. Nulla fermentum dictum justo, nec fermentum ante vestibulum non. Nam nunc orci, fringilla non metus et, sagittis eleifend dolor. Curabitur feugiat bibendum euismod. Sed suscipit cursus purus, varius fermentum ipsum. Aenean vulputate, orci quis laoreet tempus, enim dolor mollis tellus, et porttitor eros ipsum eget leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      </div>
      </div>
     <Cards />
    </div>
  )
}
