const CalAvgRating = (reviews = []) => {
    const totalRating = reviews.reduce((acc, item) => acc + (item.rating || 0), 0); // Default to 0 if rating is missing
    const avgRating = reviews.length === 0
        ? 0
        : (totalRating / reviews.length).toFixed(1); // Calculate average rating

    return {
        totalRating,
        avgRating,
    };
};

export default CalAvgRating;
