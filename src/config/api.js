/*
 *  api content
 *  
 */ 

const nodeBase = 'http://powerformer.com:3000';
// const nodeBase = 'http://localhost:4000';


 const questionApi = (id) => ({
   getQuestions: `/questions/`,
   endOfThisQuestion: '/endOfThisQuestion',
 });

 const userApi = {
   login: '/users/login',
   ready: '/update_logged',
   allUsers: '/users/',
   addPlayers: '/addPlayers/',
 };

 const contestantsApi = (id) => ({
   getContestants: `/users/contestants/`,
   getSingleContestants: `/users/contestants/${id}/`,
 });

 const getStatusApi = {
  getOut: '/update_out',
  getPromote: '/update_promote',
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
   getStatusApi,
   nodeBase,
 }