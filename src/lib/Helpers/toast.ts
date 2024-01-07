import type { ToastSettings } from "@skeletonlabs/skeleton";

export const toast = (text: string, err: boolean, toastStore: any) =>
{
    const t: ToastSettings = {
        message: `<p class="text-sm">${text}</p>`,
        background: `${err ? "bg-[#000000E6]" : "bg-green-500"} text-white`,
    };
    toastStore.trigger(t);

}