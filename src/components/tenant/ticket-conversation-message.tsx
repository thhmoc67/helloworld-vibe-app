import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import type { TicketConversation } from '@/types/ticket';
import { formatTicketMessageTime, getTicketMessageText } from '@/utils/ticket-format';

const SUPPORT_AVATAR =
  'https://hello-assets-items.s3.ap-south-1.amazonaws.com/icons/logo-icon.png';

type TicketConversationMessageProps = {
  conversation: TicketConversation;
};

export function TicketConversationMessage({ conversation }: TicketConversationMessageProps) {
  const isUser = conversation.author.type === 'END_USER';
  const message = getTicketMessageText(conversation.summary);
  const time = formatTicketMessageTime(conversation.createdTime, !isUser);

  if (isUser) {
    return (
      <View style={styles.userWrap}>
        <View style={styles.userBubble}>
          <Typography variant="text" size="sm" color={palette.gray[800]}>
            {message}
          </Typography>
        </View>
        <Typography variant="label" size="xs" color={palette.gray[500]} style={styles.userTime}>
          {time}
        </Typography>
      </View>
    );
  }

  return (
    <View style={styles.supportWrap}>
      <Image source={{ uri: SUPPORT_AVATAR }} style={styles.avatar} contentFit="cover" />
      <View style={styles.supportContent}>
        <View style={styles.supportBubble}>
          <Typography variant="text" size="sm" color={palette.white}>
            {message}
          </Typography>
        </View>
        <Typography variant="label" size="xs" color={palette.gray[500]}>
          HelloWorld Support · {time}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userWrap: {
    alignSelf: 'flex-end',
    maxWidth: '82%',
    gap: 4,
    marginBottom: 16,
  },
  userBubble: {
    backgroundColor: palette.gray[100],
    borderRadius: Radius.md,
    borderTopRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userTime: {
    textAlign: 'right',
    paddingRight: 4,
  },
  supportWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    maxWidth: '88%',
    marginBottom: 16,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.gray[200],
    backgroundColor: palette.white,
  },
  supportContent: {
    flex: 1,
    gap: 4,
  },
  supportBubble: {
    backgroundColor: '#3FBEB6',
    borderRadius: Radius.md,
    borderTopLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
