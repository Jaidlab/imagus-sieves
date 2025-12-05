$=this.node.closest('[class="group/card relative flex w-full shrink-0 grow-0 flex-col gap-2 lg:gap-0"]')?.querySelector('img')?.src?.match(/clip_\w+/)?.[0];
return $ ? '//kick.com/?clip='+$ : ''