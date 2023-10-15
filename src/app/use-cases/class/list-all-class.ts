import { Class } from '@app/entities/class';
import { ClassRepository } from '@app/repositories/class-repository';
import { Injectable } from '@nestjs/common';

interface ListAllClassessResponse {
  classes: Class[];
}

@Injectable()
export class ListAllClassess {
  constructor(private classRepository: ClassRepository) {}

  async execute(): Promise<ListAllClassessResponse> {
    const classes = await this.classRepository.listAll();

    // const groupedClasses = {};

    // // Iterate through the JSON data and group classes by their "name"
    // classes.forEach((classData) => {
    //   const className = classData.name;

    //   if (!groupedClasses[className]) {
    //     groupedClasses[className] = {
    //       id: classData.id,
    //       subject: classData.subject,
    //       name: classData.name,
    //       dayOfTheWeek: [classData.dayOfTheWeek],
    //       initialDay: [classData.initialDay],
    //       endDay: [classData.endDay],
    //       initialTimeClass: [classData.initialTimeClass],
    //       endTimeClass: [classData.endTimeClass],
    //       teacher: classData.teacher,
    //       classroom: classData.classroom,
    //     };
    //   } else {
    //     groupedClasses[className].dayOfTheWeek.push(classData.dayOfTheWeek);
    //     groupedClasses[className].initialDay.push(classData.initialDay);
    //     groupedClasses[className].endDay.push(classData.endDay);
    //     groupedClasses[className].initialTimeClass.push(
    //       classData.initialTimeClass,
    //     );
    //     groupedClasses[className].endTimeClass.push(classData.endTimeClass);
    //   }
    // });

    // // Convert the groupedClasses object into an array
    // const groupedClassesArray = Object.values(groupedClasses);

    // console.log(groupedClassesArray);

    return { classes };
  }
}
