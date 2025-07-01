import { futimesSync } from "fs";


export default async function Home() {

  let response = fetch("/api")

  return (
    <div className="  flex-col justify-center ">
      <div className="text-[40px] border-4 border-blue-500 rounded-xl p-4">SAI</div>
      <QuizSection></QuizSection>
      <MyCourseSection></MyCourseSection>
      <CourseSection></CourseSection>
    </div>
  );
}


function QuizSection(){
  return(
    <div>QuizSection</div>
  )
}

function MyCourseSection(){
  return(
    <div>MyCourseSection</div>
  )
}

function CourseSection(){
  return(
    <div>CourseSection</div>
  )
}