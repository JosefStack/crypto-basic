document.addEventListener("DOMContentLoaded", function () {
    const trendingButton = document.querySelector(
        ".main-top-right-listings-header-left-left",
    );
    const topButton = document.querySelector(
        ".main-top-right-listings-header-left-right",
    );

    const trending = document.querySelector(
        ".main-top-right-listings-items-trending",
    );
    const top = document.querySelector(".main-top-right-listings-items-top");

    const trendingSelectionBar = document.querySelector(
        ".trending-selection-bar",
    );
    const topSelectionBar = document.querySelector(".top-selection-bar");
    console.log(trendingSelectionBar);

    trendingButton.addEventListener("click", function () {
        if (!trending.classList.contains("active")) {
            trending.classList.add("active");
            top.classList.remove("active");

            trendingSelectionBar.classList.add("active");
            topSelectionBar.classList.remove("active");

            trendingButton.classList.add("active");
            topButton.classList.remove("active");
        }
    });

    topButton.addEventListener("click", function () {
        if (!top.classList.contains("active")) {
            top.classList.add("active");
            trending.classList.remove("active");

            topSelectionBar.classList.add("active");
            trendingSelectionBar.classList.remove("active");

            topButton.classList.add("active");
            trendingButton.classList.remove("active");
        }
    });
});
