def Response(status: int, data=None):
    return {
        "status": status,
        "data": data
    }, status
