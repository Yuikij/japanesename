const d = require('../新版本PSEO改造/keyword/keyword.json');
const active = d.filter(k=>k.strategy==='category_page' && k.status==='active');

const quizSlugs = new Set(['last-names','last-names-female','last-names-male','last-names-unique','last-names-common','last-names-cute','last-names-cool','cute-girl','cool-female','cool-male','popular-boy','powerful-girl','popular-male','cute-boy','common-girl','rare-girl','unique-male','unique-female','unique-girl','unique-boy','elegant','male-anime','female-anime','female-meanings','popular-girl','first-male','boy-meanings','popular-female','common','common-first','common-boy','common-male','cute-male','common-female','male-meanings','fierce-historical','cute-female','pretty-female','beautiful-female','last','last-names-with-meanings','gender-neutral','middle','that-mean-death','baby-boy','pet']);

const pageSlug = (k) => k.path.replace('/names/','');

const showQuiz = active.filter(k=>quizSlugs.has(pageSlug(k)));
console.log('Pages that WILL show quiz (' + showQuiz.length + '):');
showQuiz.forEach(k=>console.log(' ', k.path));

const kwQuizButNoData = active.filter(k=>k.quiz && typeof k.quiz==='object' && k.quiz.slug && !quizSlugs.has(pageSlug(k)));
console.log('\nkw.quiz set but QUIZ_DATA missing slug — quiz will NOT show (' + kwQuizButNoData.length + '):');
kwQuizButNoData.forEach(k=>console.log(' ', k.path, '| kw.quiz.slug='+k.quiz.slug, '| url-slug='+pageSlug(k)));

const buggyTrue = active.filter(k=>k.quiz===true);
console.log('\nquiz=true (buggy, should be null/object) (' + buggyTrue.length + '):');
buggyTrue.forEach(k=>console.log(' ', k.id, k.path));
