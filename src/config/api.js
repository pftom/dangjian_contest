/*
 *  api content
 *  
 */ 

 const nodeBase = 'http://localhost:4000';

 const questionApi = (id) => ({
   getSingleOption: `/questions/single/${id}/`,
   getMultiplyOption: `/questions/multiple/${id}/`,
 });

 const userApi = {
   login: '/users/login',
   ready: '/update_logged',
   allUsers: '/users/',
 };

 const contestantsApi = (id) => ({
   getContestants: `/users/contestants/`,
   getSingleContestants: `/users/contestants/${id}/`,
 });

 const getOutApi = {
  'getOut': '/update_out',
 };

 const noticeApi = {
    push_notification: '/push_notification',
    next_contest: '/next_contest',
 };

 export {
   questionApi,
   noticeApi,
   contestantsApi,
   userApi,
   getOutApi,
   nodeBase,
 }