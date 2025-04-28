import * as XLSX from 'xlsx';

export const userServices = {
    exportToExcel: (users) => {
        const exportData = users.map(user => ({
            ID: user.id,
            'Full Name': user.fullName,
            Username: user.username,
            Email: user.email,
            'Phone Number': user.phoneNumber,
            Roles: user.roleNames.join(", "),
            Status: user.isActive ? "Active" : "Inactive",
            'Date of Birth': user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : '',
            Address: user.addresses?.find(addr => addr.isMain)?.addressLine || user.addresses?.[0]?.addressLine || '',
            Country: user.addresses?.find(addr => addr.isMain)?.country || user.addresses?.[0]?.country || '',
            'Created At': new Date(user.createdAt).toLocaleDateString()
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Users");
        XLSX.writeFile(wb, `users-export-${new Date().toISOString()}.xlsx`);
    }
};