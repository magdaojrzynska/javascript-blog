'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active')
    console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [IN PROGRESS] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute("href");
    console.log(articleSelector)

    /* [IN PROGRESS] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle)

    /* [IN PROGRESS] add class 'active' to the correct article */

    targetArticle.classList.add('active')
    console.log('targetArticle:', targetArticle);

}



const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

function clearMessages() {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
}

function generateTitleLinks() {
    const titleList = document.querySelector(optTitleListSelector);
    /* IN PROGRESS remove contents of titleList */

    clearMessages()

    /* IN PROGRESS for each article */

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for (let article of articles) {
        console.log(article)
        /* NIE DZIAŁA get the article id */

        const articleID = article.getAttribute("id");
        console.log(articleID)

        /* find the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* get the title from the title element */

        /* create HTML of the link */

        const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
        console.log(linkHTML)

        //titleList.innerHTML = titleList.innerHTML + linkHTML;

        /* insert link into titleList */

        //titleList.insertAdjacentHTML("afterend", linkHTML)

        html = html + linkHTML;
    }

    titleList.innerHTML = html;



}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log(links)

for (let link of links) {
    link.addEventListener('click', titleClickHandler);

}


function generateTags() {

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {
        console.log(article)

        /* find tags wrapper */
        const tagsList = article.querySelector(optArticleTagsSelector);
        console.log(tagsList)
        /* make html variable with empty string */

        let html = '';

        /* get tags from data-tags attribute */

        const articleTags = article.getAttribute("data-tags");
        console.log(articleTags)

        /* split tags into array */

        const articleTagsArray = articleTags.split(' ');
        console.log(articleTagsArray)

        /* START LOOP: for each tag */

        for (let tag of articleTagsArray) {
            console.log(tag)

            /* generate HTML of the link */

            const linkHTML = '<li><a href="#' + tag + '">' + tag + '</a></li>';
            console.log(linkHTML)

            /* add generated code to html variable */

            html = html + ' ' + linkHTML;

            /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */

        tagsList.innerHTML = html;

        /* END LOOP: for every article: */
    }
}

generateTags();