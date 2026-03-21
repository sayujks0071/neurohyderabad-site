import asyncio
import os
import json
import logging
from datetime import timedelta
import subprocess

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("daily-sandbox")

async def run_analysis_local():
    logger.info("Executing local fallback analysis...")
    try:
        # We assume requirements beautifulsoup4, requests are present because it was suggested
        # by the review to not use pip install here, instead we'll run seo_analyzer.py via subprocess.
        script_path = os.path.join(os.path.dirname(__file__), "seo_analyzer.py")
        result = subprocess.run(["python3", script_path], capture_output=True, text=True)
        if result.returncode == 0:
            logger.info(f"Local fallback output: {result.stdout.strip()}")
            logger.info("✅ Successfully extracted and saved reports/daily_sandbox_report.json")
        else:
            logger.error(f"Local fallback script failed: {result.stderr}")
    except Exception as e:
        logger.error(f"Local fallback execution failed: {e}")

async def main() -> None:
    logger.info("🚀 Starting Daily OpenSandbox Improvement Task...")
    sandbox = None

    try:
        from opensandbox import Sandbox
        from opensandbox.models import WriteEntry
        from code_interpreter import CodeInterpreter, SupportedLanguage
        sandbox = await Sandbox.create(
            "opensandbox/code-interpreter:v1.0.1",
            entrypoint=["/opt/opensandbox/code-interpreter.sh"],
            timeout=timedelta(minutes=10),
            env={"PYTHON_VERSION": "3.11"},
        )
    except ImportError as e:
        logger.error(f"❌ Sandbox SDK import failed: {e}")
        logger.warning("Attempting local execution fallback...")
        await run_analysis_local()
        return
    except Exception as e:
        logger.error(f"❌ Sandbox creation failed: {e}")
        logger.warning("Attempting local execution fallback...")
        await run_analysis_local()
        return

    if sandbox is not None:
        try:
            async with sandbox:
                logger.info(f"✅ Sandbox created (ID: {sandbox.id})")

                # 1. Read the keyword registry from the host repository
                try:
                    with open("seo/keyword-registry.json", "r") as f:
                        keyword_registry_data = f.read()
                except FileNotFoundError:
                    logger.warning("seo/keyword-registry.json not found. Using an empty JSON array.")
                    keyword_registry_data = "[]"

                # 2. Write the keyword registry into the sandbox filesystem
                logger.info("Writing keyword registry to the isolated environment...")
                await sandbox.files.write_files([
                    WriteEntry(path="/tmp/keyword-registry.json", data=keyword_registry_data, mode=644)
                ])

                # Write the analyzer script into the sandbox
                with open(os.path.join(os.path.dirname(__file__), "seo_analyzer.py"), "r") as f:
                    analyzer_code = f.read()

                # Strip out the local flag execution at the bottom and add remote execution
                remote_analyzer_code = analyzer_code.replace('print(run_analysis(is_local=True))', 'print(run_analysis(is_local=False))')

                await sandbox.files.write_files([
                    WriteEntry(path="/tmp/seo_analyzer.py", data=remote_analyzer_code, mode=644)
                ])

                # 3. Create a Code Interpreter
                interpreter = await CodeInterpreter.create(sandbox)

                # 4. Execute a shell command to install dependencies
                logger.info("Installing beautifulsoup4 and requests inside the sandbox...")
                execution = await sandbox.commands.run("pip install beautifulsoup4 requests")
                if execution.logs.stdout:
                    logger.info(f"Pip Output: {execution.logs.stdout[0].text.strip()}")

                logger.info("Executing isolated Python analysis via CodeInterpreter...")
                # 6. Execute Python code inside the sandbox via CodeInterpreter
                result = await interpreter.codes.run(
                    "import os\nos.system('python /tmp/seo_analyzer.py')",
                    language=SupportedLanguage.PYTHON,
                )

                if result.result and result.result[0].text:
                    logger.info(f"Interpreter Result: {result.result[0].text.strip()}")
                if result.logs.stdout and result.logs.stdout[0].text:
                    logger.info(f"Sandbox Output: {result.logs.stdout[0].text.strip()}")
                if result.logs.stderr and result.logs.stderr[0].text:
                    logger.warning(f"Sandbox Errors: {result.logs.stderr[0].text.strip()}")

                # 7. Read the generated file from the sandbox
                logger.info("Extracting the generated report from the sandbox...")
                try:
                    report_content = await sandbox.files.read_file("/tmp/daily_report.json")

                    os.makedirs("reports", exist_ok=True)
                    report_path = "reports/daily_sandbox_report.json"
                    with open(report_path, "w") as f:
                        f.write(report_content)
                    logger.info(f"✅ Successfully extracted and saved {report_path}")

                except Exception as e:
                    logger.error(f"❌ Failed to retrieve report from sandbox: {e}")

        finally:
            # 8. Cleanup the sandbox
            await sandbox.kill()
            logger.info("🛑 Sandbox terminated safely.")

if __name__ == "__main__":
    asyncio.run(main())
