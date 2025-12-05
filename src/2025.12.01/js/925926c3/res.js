const o=JSON.parse($._).job, t=o&&[new Date(o.created).toLocaleString(), o.title?.slice(0,34)!==o.prompts[0].slice(0,34)&&o.title, 'Prompts: '+o.prompts?.join(", "), o.tags&&'Tags: [ '+o.tags.join(", ")+' ]', o.description].filter(Boolean).join(" | "), u='https://images'+$[1];
let m=o?.progressImages?.map(i=>[u+i.output,i.output==o.output?t:i.revisedPrompt||''])||o?.output;
if(Array.isArray(m))m=m.concat(m.splice(0,m.findIndex(i=>i[0].slice(31)==o.output)));
return m ? Array.isArray(m) ? m : [u+m,t] : ''