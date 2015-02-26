$.ku4webApp.config.navigator = {
    "ku4routes": {
        "test.hash2*":  "test.hash2",
        "test.hash2":   "test.hash1",
        "test.hash1":   "test.hash1",
        "ku4default":   "test.hash0"
    },
    "test.hash0": {
        model: "test",
        method: "method0"
    },
    "test.hash1": {
        model: "test",
        method: "method1"
    },
    "test.hash2": {
        model: "test",
        method: "method2"
    }
};