<script lang="ts">

</script>

<div class="overflow-auto rounded-lg shadow hidden md:block">
    <table class="w-full">

        <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
                <th class="w-full p-3 text-sm font-semibold tracking-wide text-left truncate">Quiz Name</th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left truncate">Class Name</th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left truncate">Enroll Code</th>
            </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
            {#each  [] ?? [] as createdAnnouncement }
                <tr class="bg-white">
                
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <button title="Click to view details of {createdAnnouncement} " class="font-bold text-blue-500 hover:underline transition-all active:scale-95"
                        
                        >{createdAnnouncement}</button>
                    </td>
                
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span class="p-1.5 text-xs font-medium tracking-wider text-red-500 bg-opacity-50">{createdAnnouncement}</span>
                    </td>

                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span class="p-1.5 text-xs font-medium tracking-wider text-red-500 bg-opacity-50">{createdAnnouncement}</span>
                    </td>

                </tr>

                
               
            {/each}
        
        </tbody>
    </table>
</div>