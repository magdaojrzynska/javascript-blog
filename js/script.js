'use strict';

const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
}


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
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.list.authors';

function clearMessages() {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
}

function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);
    /* IN PROGRESS remove contents of titleList */

    clearMessages()

    /* IN PROGRESS for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

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

        const linkHTMLData = { id: articleID, title: articleTitle };
        const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateTagsParams(tags) {

    const params = {
        max: 0,
        min: 999999
    };

    for (let tag in tags) {
        params.max = Math.max(tags[tag], params.max);
        params.min = Math.min(tags[tag], params.min);

        console.log(tag + ' is used ' + tags[tag] + ' times');
    }

    return params
}

function calculateTagClass(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    return optCloudClassPrefix + classNumber
}

function generateTags() {

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

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

            // const linkHTML = '<li><a href="#tag-' + tag + '"">' + tag + '</a></li>';
            // console.log(linkHTML) 

            const linkHTMLData = { id: 'tag-' + tag, title: tag };
            const linkHTML = templates.articleLink(linkHTMLData);
            console.log(linkHTML)


            /* add generated code to html variable */

            html = html + ' ' + linkHTML;

            /* [NEW] check if this link is NOT already in allTags */
            if (!allTags.hasOwnProperty(tag)) {
                /* [NEW] add generated code to allTags object */
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }

            /* END LOOP: for each tag */

        }
        /* insert HTML of all the links into the tags wrapper */

        tagsList.innerHTML = html;

        /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */
    //tagList.innerHTML = allTags.join(' ');
    //console.log(allTags);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)
    //let allTagsHTML = ''
    const allTagsData = { tags: [] };

    /* [NEW] Start Loop: for each tag in allTags: */
    for (let tag in allTags) {
        /* [NEW] generate code of a link and add it to allTagHTML */
        //allTagsHTML += '<li><a href="#tag-' + tag + '"" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a>' + ' (' + allTags[tag] + ') </li>';

        //allTagsHTML += tagLinkHTML;

        allTagsData.tags.push({
            tag: tag,
            count: allTags[tag],
            className: calculateTagClass(allTags[tag], tagsParams)
        });

    }

    /* [NEW] End Loop: for each tag in allTags: */

    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);

}

generateTags();

function tagClickHandler(event) {

    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;
    console.log('Tag was clicked!');

    /* !!! make a new constant "href" and read the attribute "href" of the clicked element !!!!*/

    const href = clickedElement.getAttribute(["href"]);
    console.log(href)

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');
    console.log(tag)

    /* find all tag links with class active */

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */

    for (let activeTag of activeTags) {

        /* remove class active */
        activeTag.classList.remove('active');
        console.log(activeTag)

    }
    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */

    const constantTags = document.querySelectorAll('a[href="' + href + '"]');
    console.log(constantTags)


    /* START LOOP: for each found tag link */

    for (let constantTag of constantTags) {
        constantTag.classList.add('active')
    }

    /* add class active */

    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');

}


function addClickListenersToTags() {

    const links = document.querySelectorAll('.list a');
    console.log(links)

    for (let link of links) {
        link.addEventListener('click', tagClickHandler);

        /* find all links to tags */

        /* START LOOP: for each link */

        /* add tagClickHandler as event listener for that link */

        /* END LOOP: for each link */
    }
}

addClickListenersToTags();


function generateAuthors() {

    /*NEW */
    let allAuthors = {};

    /* find all authors */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every author: */
    for (let article of articles) {
        const authorList = article.querySelector(optArticleAuthorSelector);

        const authorName = article.getAttribute("data-author");

        authorList.innerHTML = authorName

        /* [NEW] */
        if (!allAuthors.hasOwnProperty(authorName)) {
            allAuthors[authorName] = 1;
        } else {
            allAuthors[authorName]++;
        }

    }
    /* [NEW] */
    const authorsList = document.querySelector(optAuthorsListSelector);
    /*authorsList.innerHTML = allAuthors.join(''); */

    /*let allAuthorsHTML = ''*/

    let allAuthorsData = { authors: [] };

    for (let author in allAuthors) {
        //const linkHTML = '<a href="#author-' + author + '">' + author + '</a>';
        

       

        const linkHTMLData = { id: 'author-' + author, title: author };
        const linkHTML = templates.articleLink(linkHTMLData);

        allAuthorsData.authors.push({
            linkHTML: linkHTML,
            count: allAuthors[author],
        });

        //allAuthorsHTML += '<li>' + linkHTML + '(' + allAuthors[author] + ')</li>';

    }

    authorsList.innerHTML = templates.authorLink(allAuthorsData)
    /* END LOOP: for every article: */
}


    generateAuthors()

    function authorClickHandler(event) {
        event.preventDefault();

        const clickedElement = this;

        const href = clickedElement.getAttribute(["href"]);

        const author = href.replace('#author-', '');

        generateTitleLinks('[data-author="' + author + '"]');

    }


    function addClickListenersToAuthors() {

        const links = document.querySelectorAll('.post-author a');
        console.log("@@@@", links)

        for (let link of links) {
            link.addEventListener('click', authorClickHandler);
        }
    }

    addClickListenersToAuthors()