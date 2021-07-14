interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

interface CourseNormalPart extends CoursePartBase {
    type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseDescriptionPart extends CoursePartBase {
    description: string;
}

interface CourseSpecialPart extends CoursePartBase {
    type: "special";
    requirements: Array<string>;
}

export type CoursePart = CourseProjectPart | (CourseNormalPart | CourseSubmissionPart | CourseSpecialPart) & CourseDescriptionPart;