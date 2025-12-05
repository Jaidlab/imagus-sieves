$=this.node.closest('[data-video-id]')?.getAttribute('data-video-id');
return $ ? '//plvideo.ru/watch?v='+$ : ''