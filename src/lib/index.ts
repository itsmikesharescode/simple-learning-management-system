import type { Session } from "@supabase/supabase-js";
import {writable} from "svelte/store";
import type { CreatedCLassTB, JoinedAndCreatedClassTB } from "./types";

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
})

// learner store management

//my classes
export const myClassesState = writable({
    getDedicatedClass:<JoinedAndCreatedClassTB[] | null> null,
});