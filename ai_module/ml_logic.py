def is_distress_voice(text, tone_score=0.7):
    """
    Simulates threat analysis from voice input.
    In reality, you'd analyze the tone, pitch, keywords, etc.
    """
    distress_keywords = ['help', 'save me', 'danger', 'please', 'stop']
    threat_detected = any(word in text.lower() for word in distress_keywords)
    tone_triggered = tone_score >= 0.7  # simulate ML model score threshold

    return threat_detected and tone_triggered
