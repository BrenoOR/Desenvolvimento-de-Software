import os
import sys
import logging
from logging.config import fileConfig
from server.server import RPCServer

fileConfig("app/log.ini")
logger = logging.getLogger()


def main():
    logger.info("Starting Manager service.")
    rpc_server = RPCServer()
    rpc_server.start()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        logger.info("Exiting.")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
