import re

with open('app/_components/OpenAIAPIAgent.tsx', 'r') as f:
    content = f.read()

import_statement = 'import { Suggestion, Suggestions } from "@/src/components/ai-elements/suggestion";\n'

# Add import if not present
if import_statement not in content:
    # Insert after the last import
    last_import_idx = content.rfind('import')
    end_of_last_import = content.find('\n', last_import_idx) + 1
    content = content[:end_of_last_import] + import_statement + content[end_of_last_import:]

quick_actions = """
  const handleQuickAction = async (action: string) => {
    // Log user interaction
    logAppointmentBooking('ai_chat_interaction_quick_action', service || 'general');

    await sendMessage({ text: action });
  };

  const quickActions = [
    "I need to book a new consultation",
    "I want to reschedule my appointment",
    "I have severe headache and dizziness",
    "I need information about spine surgery",
    "What are your clinic hours?",
    "Tell me about endoscopic spine surgery"
  ];
"""

# add quick actions definition before return
content = content.replace("  return (\n    <div className=\"max-w-4xl mx-auto\">", quick_actions + "  return (\n    <div className=\"max-w-4xl mx-auto\">")


search_block = """          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}"""

replace_block = """          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="p-4 border-t border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">Quick actions:</p>
            <Suggestions>
              {quickActions.map((action, index) => (
                <Suggestion
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  suggestion={action}
                  disabled={isLoading}
                  className="bg-[var(--color-primary-50)] text-[var(--color-primary-700)] hover:bg-[var(--color-primary-100)] transition-colors disabled:opacity-50"
                />
              ))}
            </Suggestions>
          </div>
        )}

        {/* Input Form */}"""

content = content.replace(search_block, replace_block)

with open('app/_components/OpenAIAPIAgent.tsx', 'w') as f:
    f.write(content)
