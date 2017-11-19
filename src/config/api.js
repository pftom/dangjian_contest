/*
 *  api content
 *  
 */ 

 const base = 'http://60.205.183.134:8000';

 const questionApi = (id) => ({
   getSingleOption: `/questions/single/${id}/`,
   getMultiplyOption: `/questions/multiple/${id}/`,
 });

 const userApi = {
   login: '/users/login/',
 };

 const contestantsApi = (id) => ({
   getContestants: `/users/contestants/`,
   getSingleContestants: `/users/contestants/${id}/`,
 });

 const getOutApi = {
  'getOut': '/users/getOut',
 };

 const noticeApi = {
    push_notification: '/push_notification',
    next_contest: '/next_contest',
 };

 export {
   base,
   questionApi,
   noticeApi,
   contestantsApi,
   userApi,
   getOutApi,
 }