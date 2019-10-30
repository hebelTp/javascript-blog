{
  'use strict';
  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector :', articleSelector );

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  /* create function to generate title links */
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleTagsSelectorOper = '.post-tags .list a';

  function generateTitleLinks() {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log('titleList' , titleList);

    /*for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';                                                                      //third method
    console.log('articles' , articles);

    for (let article of articles) {

      /* get the article id */                                                                             // the same //   /* get 'href' attribute from the clicked link */
      const articleId = article.getAttribute('id');                                                                           //const articleSelector = clickedElement.getAttribute('href');
      console.log('article Id' , articleId);                                                                                  //console.log('articleSelector :', articleSelector );

      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('linkHTML' , linkHTML);

      /* insert link into titleList */
      /*titleList.innerHTML = titleList.innerHTML + linkHTML;*/                   // first method
      /*titleList.insertAdjacentHTML('beforebegin' , linkHTML);*/                 // second method
      html = html + linkHTML;                                                     // third method
      console.log('HTML', html);
    }
    titleList.innerHTML = html;                                                 // third method
    const links = document.querySelectorAll('.titles a');
    console.log('LINKS' , links);                                                       // bug investigation

    for(let link of links) {
      console.log(link);
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();

  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('ARTILES', articles);
    /* START LOOP: for every article: */
    for (let article of articles ){
    /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);
      console.log('TagLELIST' , tagList);

      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('TAG SELECTOR', articleTags );
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('ARTICLETAGSARRAY', articleTagsArray);
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray){
        console.log('TAG', tag);
        /* generate HTML of the link */
        const tagHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log('TAG HTML', tagHtml);
        /* add generated code to html variable */
        html= html+tagHtml;
        console.log('HTML', html);
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML=html;
      console.log('HTML', html );

    /* END LOOP: for every article: */
    }
  }


  generateTags();

  const tagClickHandler = function(event){                                                      // ORDER //
    console.log('Tag was clikced');
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this ;
    console.log('CLICKED ELEMENT', clickedElement);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    href = clickedElement.getAttribute('href');
    console.log('href', href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('TAG', tag);
    /* find all tag links with class active */

    /* START LOOP: for each active tag link */

    /* remove class active */

    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */

    /* START LOOP: for each found tag link */

    /* add class active */

    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks();
  };

  function addClickListenersToTags(){                                                    // 1
    /* find all links to tags */
    const tags = document.querySelectorAll(optArticleTagsSelectorOper);                        //2 a.active  and a without dot for test
    console.log(tags);
    /* START LOOP: for each link */
    for(let tag of tags){
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);
      console.log('tag', tag);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();







}



