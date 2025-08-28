import logging
import time

logger = logging.getLogger(__name__)

class RequestLogMiddleware:
    """
    Logs each request and response with timing
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Before view
        start_time = time.time()
        logger.info(f"📥 Request: {request.method} {request.get_full_path()} from {request.META.get('REMOTE_ADDR')}")

        response = self.get_response(request)

        # After view
        duration = time.time() - start_time
        logger.info(
            f"📤 Response: {response.status_code} "
            f"{request.method} {request.get_full_path()} "
            f"in {duration:.2f}s"
        )

        return response
