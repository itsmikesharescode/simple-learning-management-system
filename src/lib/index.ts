import type { Session } from "@supabase/supabase-js";
import {writable} from "svelte/store";
import type { ClassName, CreatedAnnouncementTB, CreatedCLassTB, JoinedAndCreatedClassTB, LearnersType } from "./types";

export const navState = writable({
    session:<Session | null> null,
    activeItem: "",

    defaultNav: [
        {
            title: "created by mike",
            url: "/"
        }
    ],

    learnerNav: [
        {
            title: "MyClasses",
            url: "/learner/my-classes",
        },

        {
            title: "Announcements",
            url: "/learner/announcements",
        },

        {
            title: "Assignments",
            url: "/learner/assignments",
        },

        {
            title: "Quizzes",
            url: "/learner/quizzes",
        }
    ],

    teacherNav: [
        {
            title: "CreateClass",
            url: "/teacher/create-class",
        },

        {
            title: "CreateAnnouncement",
            url: "/teacher/create-announcement",
        },

        {
            title: "CreateAssignment",
            url: "/teacher/create-assignment",
        },
        
        {
            title: "CreateQuiz",
            url: "/teacher/create-quiz",
        },
    ],


});

//teacher store management

//create class
export const createClassState = writable({
    showDetail: 0.1,
    showCreateClass: false,
    showDropClass: false,
    showConfirmDropClass: 0.1,
    createdClass:<CreatedCLassTB[] | null> null,
    showEnrolledLearners:<LearnersType[] | null> null,
})

//create announcement
export const createAnnouncementState = writable({
    showCreateAnnouncement: false,
    showClassName:<ClassName[] | null> null,
    showAnnouncements:<CreatedAnnouncementTB[] | null> null,
    showDetails: 0.1,
    showWarning: false,
})

// learner store management

//my classes
export const myClassesState = writable({
    showDetail: 0.1,
    getDedicatedClass:<JoinedAndCreatedClassTB[] | null> null,
});

//my announcements
export const myAnnouncementsState = writable({
    showAnnouncements:<CreatedAnnouncementTB[] | null> null,
})
