import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <h1>this is the dashboard, hello {auth.user.name}</h1>
        </AuthenticatedLayout>
    );
}
