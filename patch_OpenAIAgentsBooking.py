import re

with open('app/_components/OpenAIAgentsBooking.tsx', 'r') as f:
    content = f.read()

import_statement = 'import { Suggestion, Suggestions } from "@/src/components/ai-elements/suggestion";\n'

# Add import if not present
if import_statement not in content:
    # Insert after the last import
    last_import_idx = content.rfind('import')
    end_of_last_import = content.find('\n', last_import_idx) + 1
    content = content[:end_of_last_import] + import_statement + content[end_of_last_import:]

search_block = """        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="p-4 border-t border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(action)}
                  className="text-xs bg-[var(--color-primary-50)] text-[var(--color-primary-700)] px-3 py-1 rounded-full hover:bg-[var(--color-primary-100)] transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}"""

replace_block = """        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="p-4 border-t border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">Quick actions:</p>
            <Suggestions>
              {quickActions.map((action, index) => (
                <Suggestion
                  key={index}
                  onClick={() => setInputValue(action)}
                  suggestion={action}
                  disabled={isLoading}
                  className="bg-[var(--color-primary-50)] text-[var(--color-primary-700)] hover:bg-[var(--color-primary-100)] transition-colors disabled:opacity-50"
                />
              ))}
            </Suggestions>
          </div>
        )}"""

content = content.replace(search_block, replace_block)

with open('app/_components/OpenAIAgentsBooking.tsx', 'w') as f:
    f.write(content)
