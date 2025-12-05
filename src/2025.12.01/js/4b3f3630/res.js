console.log("Rule34.us Sieve");

orig_img_url=$._.match(/href="([^"]*?)".{1,100}Original/)[1];

var returnval = [
            [orig_img_url, ""]
        ];
console.log("returnval: ", returnval);
return returnval;