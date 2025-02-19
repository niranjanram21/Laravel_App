<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @vite('resources/js/app.jsx')
    @vite(['resources/css/app.css'])
</head>
<body>
    @inertia
</body>
</html>