const ret = [];

const data = JSON.parse(/window.INITIAL_STATE\s*=\s*({[^]+?})[;\s]*<\/script>/gm.exec($._)[1]);

for (let i = 0; i < data.offerCard.card.fullImages.length; i++) {
    ret.push([
        data.offerCard.card.fullImages[i],
        i === 0 ? data.offerCard.card.description : ''
    ]);
}

return ret;