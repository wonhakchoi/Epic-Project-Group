export const predict = (results) => {
    let scoreArr = Array(results.length)

    let maxRating = findMaxRating(results)
    let mostPopular = findMostPopular(results)

    for (let i = 0; i < results.length; i++) {
        scoreArr[i] = score(results[i].rating, results[i].user_ratings_total, maxRating, mostPopular)
        let j = i - 1;
        let current = scoreArr[i];
        let currentResult = results[i]
        while ((j > -1) && scoreArr[j] < current) {
            scoreArr[j + 1] = scoreArr[j];
            results[j + 1] = results[j];
            j--; 
        }
        scoreArr[j + 1] = current;
        results[j + 1] = currentResult;
    }

    return results;
    
}

const score = (rating, users, maxRating, mostPopular) => {
    return (rating/maxRating) + (users/mostPopular)
}

const findMaxRating = (results) => {
    let max = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i].rating > max) {
            max = results[i].rating;
        }
    }
    return max;
}

const findMostPopular = (results) => {
    let max = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i].user_ratings_total > max) {
            max = results[i].user_ratings_total;
        }
    }
    return max;
}