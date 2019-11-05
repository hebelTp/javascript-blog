{
  'use strict';
  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  /* create function to generate title links */
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleTagsSelectorOper = '.post-tags .list a',
    optArticleAuthorsSelectorOper = '.post-author a ',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-' ;

  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    /*for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for (let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

    for (let link of links) {

      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();

  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 99999,
    };
    for (let tag in tags){
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
      console.log( tag + ' is used ' + tags[tag] + ' times');
    }
    return params;
  }

  function calculateTagsClass(count, params){
    console.log(count);
    console.log(params);
    const normalizedCount = count - params.min;
    console.log(normalizedCount);
    const normalizedMax = params.max - params.min;
    console.log(normalizedMax);
    const percentage = normalizedCount/normalizedMax;
    console.log(percentage)
    const classNumber = Math.floor(percentage * (optCloudClassCount -1) + 1 );
    console.log (classNumber);
    const classAndValueNumber = optCloudClassPrefix + classNumber;
    return classAndValueNumber;
  }

  function generateTags() {

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles ){

      /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {

        /* generate HTML of the link */
        const tagHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* add generated code to html variable */
        html= html+tagHtml;

        /* [NEW] check if this link is NOT alredy in allTags */
        if(!allTags.hasOwnProperty(tag)) {

          /* [NEW add generated code to allTags object] */
          allTags[tag]= 1;
        } else {
          allTags[tag]++ ;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML=html;

      /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams', tagsParams);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags */
    for (let tag in allTags) {

      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a class="' + calculateTagsClass(allTags[tag], tagsParams) +  '" href="#tag-' + tag + '">' + tag + ' ' + '</a></li>'; //
      /* [NEW] END LOOP: for each tag in allTags: */
    }

    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
    console.log(allTagsHTML);
  }

  generateTags();

  const tagClickHandler = function(event) {

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this ;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags){

      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const tagLinks = document.querySelectorAll('a[href^="#tag-' + tag + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {

      /* add class active */
      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  function addClickListenersToTags() {
    /* find all links to tags */
    const tags = document.querySelectorAll(optArticleTagsSelectorOper);

    /* START LOOP: for each link */
    for (let tag of tags){

      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  function generateAuthor() {
    /* [NEW] create a new variable allAuthors with an empty array */
    let allAuthors = [] ;
    // console.log(allAuthors);
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find Author wrapper */
      const authorList = article.querySelector(optArticleAuthorSelector);

      /* make html variable with empty string */
      let = html = '';

      /* get tags from data-authors attribute */
      const articleAuthors = article.getAttribute('data-authors');

      /* generate HTML of the link */   // WITHOUT ARRAY AND SPLIT THAT IS WHY TER IS NOT A LOOP
      const authorHtml = '<a href="#author-' + articleAuthors + '"> ' + articleAuthors + '</a>';

      /* add generated code to html variable */
      html = html + authorHtml;

      /* [NEW] check if this link is NOT alredy in allAuthors */

      if (allAuthors.indexOf(authorHtml) == -1) {

        /* [NEW add generated code to allAuthors array] */
        allAuthors.push(authorHtml);
      }

      /* insert HTML of all the links into the tags wrapper */
      authorList.innerHTML= html ;

      /* END LOOP: for every article: */
    }

    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector('.authors');

    /* add html from allAuthors to authorList */
    authorList.innerHTML = allAuthors.join(' ');
  }

  generateAuthor();

  const authorClickHandler = function(event) {

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    // console.log('HREF', href);
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    // console.log('AUTHOR', author);
    /* find all author links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */
    for (let activeAuthor of activeAuthors) {

      /* remove class active */
      activeAuthor.classList.remove('active');

    /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');

    /* START LOOP: for each found author link */
    for (let authorLink of authorLinks){

      /* add class active */
      authorLink.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateAuthorLinks" with article selector as argument */
    generateTitleLinks('[data-authors="' + author + '"]');
  };

  function addClickListenersToAuthors() {
    /* find all links to authors */
    const authors = document.querySelectorAll(optArticleAuthorsSelectorOper);

    /* START LOOP: for each link */
    for (let author of authors) {

      /* add authorClickHandler as event listener for that link */
      author.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthors();


}


