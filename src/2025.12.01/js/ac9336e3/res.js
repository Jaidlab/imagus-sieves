console.log("TBIB.org Sieve");

orig_img_url=$._.match(/href="([^"]*?)".{1,200}Original image/)[1];

var returnval = [
            [orig_img_url, ""]
        ];
console.log("returnval: ", returnval);
return returnval;