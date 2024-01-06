import type { Session } from "@supabase/supabase-js";
import {writable} from "svelte/store";

export const navState = writable({
    session:<Session | null> null,
    activeItem: "",

    learnerNav: [
        {
            title: "MyClasses",
            url: "/my-classes",
        },

        {
            title: "Announcements",
            url: "/announcements",
        },

        {
            title: "Assignments",
            url: "/assignments",
        },

        {
            title: "Quizzes",
            url: "/quizzes",
        }
    ],

    teacherNav: [
        {
            title: "CreateClass",
            url: "/create-class",
        },

        {
            title: "CreateAnnouncement",
            url: "/create-announcement",
        },

        {
            title: "CreateAssignment",
            url: "/create-assignment",
        },
        
        {
            title: "CreateQuiz",
            url: "/create-quiz",
        },
    ],


})