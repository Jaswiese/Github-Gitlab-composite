// restApi mock imported
import {rest} from 'msw';
/**
 * handlers declared for the two api calls being tested
 * both get requests are assigned the actual backend calls response for the two payload
 */
export const handlers = [

  rest.get('github/search/*', (req, res, ctx) =>
    res(
        ctx.status(200),
        ctx.json({
          'total_count': 5,
          'incomplete_results': false,
          'items': [
            {
              'login': 'svedova',
              'id': 3321893,
              'node_id': 'MDQ6VXNlcjMzMjE4OTM=',
              'avatar_url': 'https://avatars.githubusercontent.com/u/3321893?v=4',
              'gravatar_id': '',
              'url': 'https://api.github.com/users/svedova',
              'html_url': 'https://github.com/svedova',
              'followers_url': 'https://api.github.com/users/svedova/followers',
              'following_url': 'https://api.github.com/users/svedova/following{/other_user}',
              'gists_url': 'https://api.github.com/users/svedova/gists{/gist_id}',
              'starred_url': 'https://api.github.com/users/svedova/starred{/owner}{/repo}',
              'subscriptions_url': 'https://api.github.com/users/svedova/subscriptions',
              'organizations_url': 'https://api.github.com/users/svedova/orgs',
              'repos_url': 'https://api.github.com/users/svedova/repos',
              'events_url': 'https://api.github.com/users/svedova/events{/privacy}',
              'received_events_url': 'https://api.github.com/users/svedova/received_events',
              'type': 'User',
              'site_admin': false,
              'score': 1,
            },
            {
              'login': 'svedovatto',
              'id': 88555532,
              'node_id': 'MDQ6VXNlcjg4NTU1NTMy',
              'avatar_url': 'https://avatars.githubusercontent.com/u/88555532?v=4',
              'gravatar_id': '',
              'url': 'https://api.github.com/users/svedovatto',
              'html_url': 'https://github.com/svedovatto',
              'followers_url': 'https://api.github.com/users/svedovatto/followers',
              'following_url': 'https://api.github.com/users/svedovatto/following{/other_user}',
              'gists_url': 'https://api.github.com/users/svedovatto/gists{/gist_id}',
              'starred_url': 'https://api.github.com/users/svedovatto/starred{/owner}{/repo}',
              'subscriptions_url': 'https://api.github.com/users/svedovatto/subscriptions',
              'organizations_url': 'https://api.github.com/users/svedovatto/orgs',
              'repos_url': 'https://api.github.com/users/svedovatto/repos',
              'events_url': 'https://api.github.com/users/svedovatto/events{/privacy}',
              'received_events_url': 'https://api.github.com/users/svedovatto/received_events',
              'type': 'User',
              'site_admin': false,
              'score': 1,
            },
            {
              'login': 'Svedovatem48',
              'id': 20651407,
              'node_id': 'MDQ6VXNlcjIwNjUxNDA3',
              'avatar_url': 'https://avatars.githubusercontent.com/u/20651407?v=4',
              'gravatar_id': '',
              'url': 'https://api.github.com/users/Svedovatem48',
              'html_url': 'https://github.com/Svedovatem48',
              'followers_url': 'https://api.github.com/users/Svedovatem48/followers',
              'following_url': 'https://api.github.com/users/Svedovatem48/following{/other_user}',
              'gists_url': 'https://api.github.com/users/Svedovatem48/gists{/gist_id}',
              'starred_url': 'https://api.github.com/users/Svedovatem48/starred{/owner}{/repo}',
              'subscriptions_url': 'https://api.github.com/users/Svedovatem48/subscriptions',
              'organizations_url': 'https://api.github.com/users/Svedovatem48/orgs',
              'repos_url': 'https://api.github.com/users/Svedovatem48/repos',
              'events_url': 'https://api.github.com/users/Svedovatem48/events{/privacy}',
              'received_events_url': 'https://api.github.com/users/Svedovatem48/received_events',
              'type': 'User',
              'site_admin': false,
              'score': 1,
            },
            {
              'login': 'svedova-tutti',
              'id': 54397660,
              'node_id': 'MDQ6VXNlcjU0Mzk3NjYw',
              'avatar_url': 'https://avatars.githubusercontent.com/u/54397660?v=4',
              'gravatar_id': '',
              'url': 'https://api.github.com/users/svedova-tutti',
              'html_url': 'https://github.com/svedova-tutti',
              'followers_url': 'https://api.github.com/users/svedova-tutti/followers',
              'following_url': 'https://api.github.com/users/svedova-tutti/following{/other_user}',
              'gists_url': 'https://api.github.com/users/svedova-tutti/gists{/gist_id}',
              'starred_url': 'https://api.github.com/users/svedova-tutti/starred{/owner}{/repo}',
              'subscriptions_url': 'https://api.github.com/users/svedova-tutti/subscriptions',
              'organizations_url': 'https://api.github.com/users/svedova-tutti/orgs',
              'repos_url': 'https://api.github.com/users/svedova-tutti/repos',
              'events_url': 'https://api.github.com/users/svedova-tutti/events{/privacy}',
              'received_events_url': 'https://api.github.com/users/svedova-tutti/received_events',
              'type': 'User',
              'site_admin': false,
              'score': 1,
            },
            {
              'login': 'svedova-test',
              'id': 57945246,
              'node_id': 'MDQ6VXNlcjU3OTQ1MjQ2',
              'avatar_url': 'https://avatars.githubusercontent.com/u/57945246?v=4',
              'gravatar_id': '',
              'url': 'https://api.github.com/users/svedova-test',
              'html_url': 'https://github.com/svedova-test',
              'followers_url': 'https://api.github.com/users/svedova-test/followers',
              'following_url': 'https://api.github.com/users/svedova-test/following{/other_user}',
              'gists_url': 'https://api.github.com/users/svedova-test/gists{/gist_id}',
              'starred_url': 'https://api.github.com/users/svedova-test/starred{/owner}{/repo}',
              'subscriptions_url': 'https://api.github.com/users/svedova-test/subscriptions',
              'organizations_url': 'https://api.github.com/users/svedova-test/orgs',
              'repos_url': 'https://api.github.com/users/svedova-test/repos',
              'events_url': 'https://api.github.com/users/svedova-test/events{/privacy}',
              'received_events_url': 'https://api.github.com/users/svedova-test/received_events',
              'type': 'User',
              'site_admin': false,
              'score': 1,
            },
          ],
        }),
    ),
  ),
  rest.get('gitlab/*', (req, res, ctx) =>
    res(
        ctx.status(200),
        ctx.json([
          {
            'id': 5535246,
            'username': 'svedova',
            'name': 'Savas Vedova',
            'state': 'active',
            'avatar_url': 'https://gitlab.com/uploads/-/system/user/avatar/5535246/avatar.png',
            'web_url': 'https://gitlab.com/svedova',
          },
        ]),
    ),
  ),
];