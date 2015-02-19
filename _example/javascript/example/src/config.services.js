$.ku4webApp.config.sockets = {
    "employee.list": {
        verb: "GET",
        uri: "./response.create.json",
        contentType: "text/json",
        success: "svc+employeesListed",
        error: "svc-employeesListed"
    },
    "employee.add": {
        verb: "POST",
        uri: "./response.create.json",
        contentType: "text/json",
        success: "svc+employeeAdded",
        error: "svc-employeeAdded"
    },
    "department.list": {
        verb: "GET",
        uri: "./response.list.json",
        contentType: "text/json",
        success: "svc+departmentsListed",
        error: "svc-departmentsListed"
    },
    "department.add": {
        verb: "POST",
        uri: "./response.list.json",
        contentType: "text/json",
        success: "svc+departmentAdded",
        error: "svc-departmentAdded"
    }
};