def retry(times, exceptions):
    def decorator(func):
        def newfn(*args, **kwargs):
            attempt = 0
            while attempt < times:
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    print(
                        "Exception thrown when attempting to run %s, attempt "
                        "%d of %d" % (func, attempt, times)
                    )
                    print(str(e))
                    attempt += 1
            return func(*args, **kwargs)

        return newfn

    return decorator
